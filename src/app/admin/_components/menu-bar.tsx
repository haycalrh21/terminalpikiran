import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Code,
  Image,
  Link,
  Quote,
} from "lucide-react";

import { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  const handleButtonClick = (action: () => void) => {
    action();
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const buttons = [
    {
      icon: <Heading1 className="size-4" />,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
      label: "Heading 1",
    },
    {
      icon: <Heading2 className="size-4" />,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
      label: "Heading 2",
    },
    {
      icon: <Heading3 className="size-4" />,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
      label: "Heading 3",
    },
    {
      icon: <Bold className="size-4" />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
      label: "Bold",
    },
    {
      icon: <Italic className="size-4" />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      label: "Italic",
    },
    {
      icon: <Strikethrough className="size-4" />,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      label: "Strikethrough",
    },
    {
      icon: <Code className="size-4" />,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive("codeBlock"),
      label: "Code Block",
    },
    {
      icon: <Quote className="size-4" />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
      label: "Quote",
    },
    {
      icon: <AlignLeft className="size-4" />,
      action: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: editor.isActive({ textAlign: "left" }),
      label: "Align Left",
    },
    {
      icon: <AlignCenter className="size-4" />,
      action: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: editor.isActive({ textAlign: "center" }),
      label: "Align Center",
    },
    {
      icon: <AlignRight className="size-4" />,
      action: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: editor.isActive({ textAlign: "right" }),
      label: "Align Right",
    },
    {
      icon: <List className="size-4" />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
      label: "Bullet List",
    },
    {
      icon: <ListOrdered className="size-4" />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      label: "Ordered List",
    },
    {
      icon: <Highlighter className="size-4" />,
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: editor.isActive("highlight"),
      label: "Highlight",
    },
  ];

  const actionButtons = [
    {
      icon: <Image className="size-4" />,
      action: addImage,
      label: "Add Image",
    },
    {
      icon: <Link className="size-4" />,
      action: addLink,
      label: "Add Link",
    },
  ];

  return (
    <div className="border rounded-md p-1 mb-1 bg-blue-900 flex flex-wrap gap-1">
      {/* Toggle buttons */}
      {buttons.map((button: any, index) => (
        <Toggle
          key={index}
          pressed={button.isActive}
          onPressedChange={() => handleButtonClick(button.action)}
          aria-label={button.label}
          className="group relative p-2 hover:bg-cyan-500 data-[state=on]:bg-slate-300 data-[state=on]:text-blue-900 text-white"
        >
          {button.icon}
          <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded bg-black text-white whitespace-nowrap hidden group-hover:block z-10">
            {button.label}
          </span>
        </Toggle>
      ))}

      {/* Action buttons */}
      {actionButtons.map((button, index) => (
        <Button
          key={`action-${index}`}
          variant="ghost"
          size="sm"
          onClick={button.action}
          aria-label={button.label}
          className="p-2 hover:bg-cyan-500 text-white"
        >
          {button.icon}
        </Button>
      ))}
    </div>
  );
}
