import { SidebarTrigger } from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DSAVisualizer from "@/components/DSAVisualizer";
import { Button } from "@/components/ui/button";
import { CirclePlay, Play } from "lucide-react";
// Import the function from code.ts
import { runCode } from "../../code";

export default function MainContainer() {
  const handleExecuteCode = () => {
    runCode();
  };

  return (
    <>
      <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 z-40">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto">
          <Button
            variant="outline"
            size="default"
            onClick={handleExecuteCode}
          >
            Run <CirclePlay className="h-4 w-auto" />
          </Button>
        </div>
      </header>
      <div className="flex flex-1 flex-row">
        <DSAVisualizer />
      </div>
    </>
  );
}
