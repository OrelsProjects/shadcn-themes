import ColorConverter from "@/app/resources/tools/color-converter/color-converter";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <ColorConverter />
    </div>
  );
}
