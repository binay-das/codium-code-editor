import EditorPanel from "@/components/new-snippet/EditorPanel";
import Header from "@/components/new-snippet/Header";

export default function NewSnippetPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />

      <div className="flex-col lg:flex gap-4">
        <EditorPanel />
      </div>
    </div>
  );
}
