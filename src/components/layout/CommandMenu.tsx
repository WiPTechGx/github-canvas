import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useCommandMenu } from "./command-menu-context";
import {
  Sparkles,
  Home,
  FileCode,
  BookOpen,
  Moon,
  Sun,
  Github,
  Copy,
  Monitor
} from "lucide-react";
import { useTheme } from "next-themes";
import confetti from "canvas-confetti";
import { useToast } from "@/hooks/use-toast";

export function CommandMenu() {
  const { open, setOpen } = useCommandMenu();
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();
  const { toast } = useToast();

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Copied!",
      description: "Current URL copied to clipboard.",
    });
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="pb-2">
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => navigate("/"))}>
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/generator"))}>
              <FileCode className="mr-2 h-4 w-4" />
              <span>Generator</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/docs"))}>
              <BookOpen className="mr-2 h-4 w-4" />
              <span>API Documentation</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => runCommand(triggerConfetti)}>
              <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
              <span>Celebrate!</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(copyUrl)}>
              <Copy className="mr-2 h-4 w-4" />
              <span>Copy Current URL</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light Mode</span>
              {theme === "light" && <span className="ml-auto text-xs text-muted-foreground">Active</span>}
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark Mode</span>
              {theme === "dark" && <span className="ml-auto text-xs text-muted-foreground">Active</span>}
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Monitor className="mr-2 h-4 w-4" />
              <span>System</span>
              {theme === "system" && <span className="ml-auto text-xs text-muted-foreground">Active</span>}
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Links">
            <CommandItem onSelect={() => runCommand(() => window.open("https://github.com", "_blank"))}>
              <Github className="mr-2 h-4 w-4" />
              <span>GitHub</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </div>
    </CommandDialog>
  );
}
