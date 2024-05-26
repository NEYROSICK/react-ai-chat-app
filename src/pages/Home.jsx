import Chat from "@/components/Chat";
import Sidebar from "@/components/Sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const Home = () => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={25} minSize={22} className="w-52">
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <Chat className="overflow-auto" />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25}>AI</ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Home;
