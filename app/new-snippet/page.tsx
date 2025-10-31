import EditorPanel from "@/components/new-snippet/EditorPanel";
import Header from "@/components/new-snippet/Header";
import OutputPanel from "@/components/new-snippet/OutputPanel";
import RunButton from "@/components/new-snippet/RunButton";
import SaveButton from "@/components/new-snippet/SaveButton";

export default function NewSnippetPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <RunButton />
      <SaveButton />

      <div className="grid grid-cols-2 gap-4">
        <EditorPanel />
        <OutputPanel />
      </div>
    </div>
  );
}
