"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState, useEffect } from "react";

import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { FileHandler } from "@tiptap/extension-file-handler";
import { ProfilePageProps } from "@/interface/user/user";
import MenuBar from "./menu-bar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Save, CheckCircle } from "lucide-react";
import { savePost, updatePost } from "@/app/actions/posts/action";

interface RichTextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  editable?: boolean;
  session: ProfilePageProps["session"];
  title?: string;
  onTitleChange?: (title: string) => void;
  postId?: string; // For updating existing post
  slug?: string; // For creating new post
}

export default function RichTextEditor({
  content,
  onChange,
  editable,
  session,
  title,
  onTitleChange,
  postId,
  slug,
}: RichTextEditorProps) {
  const isEditable = editable ?? true;
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [currentTitle, setCurrentTitle] = useState(title || "");
  const [currentContent, setCurrentContent] = useState(content || "");
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]); // Track uploaded image URLs

  // Function to upload file to Pinata
  const uploadFileToPinata = async (file: File): Promise<string> => {
    try {
      setIsUploading(true);
      setUploadProgress(`Uploading ${file.name}...`);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();

      setUploadProgress("Upload completed!");

      // Return the URL from Pinata response
      // Check different possible response formats
      const imageUrl =
        result.url || result.data?.url || result.ipfsUrl || result.IpfsHash
          ? `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
          : result;

      // Add URL to uploaded images array
      setUploadedImageUrls((prev) => [...prev, imageUrl]);

      return imageUrl;
    } catch (error) {
      console.error("💥 Upload error:", error);
      setUploadProgress("Upload failed!");
      throw error;
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(""), 3000);
    }
  };

  // Function to save post
  const handleSavePost = async () => {
    // Use default values if title or content is empty
    const titleToSave = currentTitle.trim() || "Untitled Post";
    const contentToSave = currentContent.trim() || "<p>No content</p>";

    setIsSaving(true);
    setSaveStatus("saving");
    const userId = session.user.id;

    try {
      const postData = {
        title: titleToSave,
        content: contentToSave,
        userId,
        slug: slug || titleToSave.toLowerCase().replace(/\s+/g, "-"),
        image: uploadedImageUrls.length > 0 ? uploadedImageUrls[0] : null, // Use first uploaded image as featured image
      };

      let result;
      if (postId) {
        // Update existing post
        result = await updatePost(postId, postData);
      } else {
        // Create new post
        result = await savePost(postData);
      }

      if (result.success) {
        setSaveStatus("saved");
      } else {
        setSaveStatus("error");
      }
    } catch (error) {
      setSaveStatus("error");
      console.error("💥 Save error:", error);
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  const editor = useEditor({
    immediatelyRender: false,
    editable: isEditable,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            1: { class: "text-3xl font-bold mb-4 mt-6" },
            2: { class: "text-2xl font-bold mb-3 mt-5" },
            3: { class: "text-xl font-bold mb-2 mt-4" },
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "text-base mb-2 leading-relaxed",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class:
              "bg-gray-500 rounded-md p-3 font-mono text-sm overflow-x-auto border",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-md",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),
      FileHandler.configure({
        allowedMimeTypes: [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/webp",
        ],
        onDrop: async (currentEditor, files, pos) => {
          for (const file of files) {
            if (file.type.startsWith("image/")) {
              try {
                // Upload to Pinata
                const imageUrl = await uploadFileToPinata(file);

                // Insert image with Pinata URL
                currentEditor
                  .chain()
                  .insertContentAt(pos, {
                    type: "image",
                    attrs: {
                      src: imageUrl,
                      alt: file.name,
                      title: file.name,
                    },
                  })
                  .focus()
                  .run();
              } catch (error) {
                // Fallback to base64 if API fails
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                  currentEditor
                    .chain()
                    .insertContentAt(pos, {
                      type: "image",
                      attrs: {
                        src: fileReader.result,
                        alt: file.name,
                        title: file.name,
                      },
                    })
                    .focus()
                    .run();
                };
              }
            }
          }
        },
        onPaste: async (currentEditor, files, htmlContent) => {
          for (const file of files) {
            if (file.type.startsWith("image/")) {
              try {
                // Upload to Pinata
                const imageUrl = await uploadFileToPinata(file);

                // Insert image with Pinata URL
                currentEditor
                  .chain()
                  .insertContent({
                    type: "image",
                    attrs: {
                      src: imageUrl,
                      alt: file.name,
                      title: file.name,
                    },
                  })
                  .focus()
                  .run();
              } catch (error) {
                // Fallback to base64 if API fails
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                  currentEditor
                    .chain()
                    .insertContent({
                      type: "image",
                      attrs: {
                        src: fileReader.result,
                        alt: file.name,
                        title: file.name,
                      },
                    })
                    .focus()
                    .run();
                };
              }
            }
          }
        },
      }),
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class: isEditable
          ? "min-h-[156px] bg-sidebar text-sidebar-foreground border rounded-md  py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-none"
          : "max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      setCurrentContent(htmlContent);
      if (onChange) {
        onChange(htmlContent);
      }
    },
  });

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setCurrentTitle(newTitle);
    if (onTitleChange) {
      onTitleChange(newTitle);
    }
  };

  // Auto-save functionality (optional)
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (currentTitle.trim() && currentContent.trim() && isEditable) {
        // You can enable auto-save here if needed
        // handleSavePost();
      }
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [currentTitle, currentContent]);

  // Loading state
  if (!editor) {
    return (
      <div className="min-h-[156px] border rounded-md bg-slate-50 py-2 px-3 flex items-center justify-center">
        <p className="text-gray-500">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Title Input */}
      {isEditable && (
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter your title here..."
            value={currentTitle}
            onChange={handleTitleChange}
            className="text-lg font-semibold"
          />
        </div>
      )}

      {/* Menu Bar */}
      {isEditable && <MenuBar editor={editor} />}

      {/* Upload Loading Indicator */}
      {isUploading && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
          <span className="text-sm text-blue-700">{uploadProgress}</span>
        </div>
      )}

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="tiptap-editor"
        style={{
          // Global styles for tiptap content
          // @ts-ignore
          "--tiptap-h1-size": "1.875rem",
          "--tiptap-h2-size": "1.5rem",
          "--tiptap-h3-size": "1.25rem",
        }}
      />

      {/* Custom CSS for TipTap editor */}
      <style jsx>{`
        .tiptap-editor h1 {
          font-size: 1.875rem !important;
          font-weight: 700 !important;
          margin-bottom: 1rem !important;
          margin-top: 1.5rem !important;
        }

        .tiptap-editor h2 {
          font-size: 1.5rem !important;
          font-weight: 700 !important;
          margin-bottom: 0.75rem !important;
          margin-top: 1.25rem !important;
        }

        .tiptap-editor h3 {
          font-size: 1.25rem !important;
          font-weight: 700 !important;
          margin-bottom: 0.5rem !important;
          margin-top: 1rem !important;
        }

        .tiptap-editor p {
          font-size: 1rem !important;
          line-height: 1.5 !important;
          margin-bottom: 0.5rem !important;
        }

        .tiptap-editor .ProseMirror {
          outline: none !important;
        }

        .tiptap-editor .ProseMirror h1:first-child,
        .tiptap-editor .ProseMirror h2:first-child,
        .tiptap-editor .ProseMirror h3:first-child {
          margin-top: 0 !important;
        }
      `}</style>

      {/* Save Button - ALWAYS VISIBLE */}
      {isEditable && (
        <div className="flex items-center gap-2 mt-4 p-4 bg-sidebar border rounded-lg">
          <Button
            onClick={handleSavePost}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : saveStatus === "saved" ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isSaving ? "Saving..." : postId ? "Update Post" : "Save Post"}
          </Button>

          {/* Save Status */}
          {saveStatus === "saved" && (
            <span className="text-sm text-green-600">
              ✅ Saved successfully!
            </span>
          )}
          {saveStatus === "error" && (
            <span className="text-sm text-red-600">❌ Failed to save</span>
          )}
        </div>
      )}

      {/* Uploaded Images Preview */}
      {uploadedImageUrls.length > 0 && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm font-medium text-green-800 mb-2">
            📸 Uploaded Images ({uploadedImageUrls.length}):
          </p>
          <div className="space-y-1">
            {uploadedImageUrls.map((url, index) => (
              <div key={index} className="text-xs text-green-700 break-all">
                {index === 0 && "🏆 Featured: "}
                {url}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      {isEditable && (
        <div className="text-sm text-gray-500 space-y-1">
          <p>
            💡 Tip: You can drag & drop or paste images directly into the editor
          </p>

          {uploadProgress && (
            <p className="text-blue-600">📊 Upload: {uploadProgress}</p>
          )}
        </div>
      )}
    </div>
  );
}
