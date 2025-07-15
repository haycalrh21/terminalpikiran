import TiptapLink from "@tiptap/extension-link";
import type { EditorView } from "@tiptap/pm/view";
import { getMarkRange } from "@tiptap/react";
import { Plugin, TextSelection } from "@tiptap/pm/state";

export const Link = TiptapLink.extend({
  inclusive: false,

  parseHTML() {
    return [
      {
        tag: 'a[href]:not([data-type="button"]):not([href *= "javascript:" i])',
      },
    ];
  },

  addProseMirrorPlugins() {
    return [
      ...((this as any).parent?.() || []),

      new Plugin({
        props: {
          handleKeyDown: (view: EditorView, event: KeyboardEvent) => {
            const { state, dispatch } = view;
            const { selection } = state;

            if (event.key === "Escape" && !selection.empty) {
              // Fokus balik ke cursor akhir seleksi
              const transaction = state.tr.setSelection(
                TextSelection.create(state.doc, selection.to)
              );
              dispatch(transaction);
              return true;
            }

            return false;
          },

          handleClick(view, pos) {
            const { schema, doc, tr } = view.state;
            const linkMark = schema.marks.link;
            if (!linkMark) return;

            const range = getMarkRange(doc.resolve(pos), linkMark);
            if (!range) return;

            const { from, to } = range;
            if (pos < from || pos > to) return;

            const transaction = tr.setSelection(
              new TextSelection(doc.resolve(from), doc.resolve(to))
            );

            view.dispatch(transaction);
          },
        },
      }),
    ];
  },
});

export default Link;
