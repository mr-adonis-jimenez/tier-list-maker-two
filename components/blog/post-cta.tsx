import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PostCTA() {
  return (
    <Card className="mt-8 border border-border bg-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Tier List Maker - Create Custom Rankings
        </CardTitle>
        <CardDescription>
          Create custom tier lists by uploading images and ranking them. Drag
          and drop images into S, A, B, C, and D tiers. Export your tier list as
          an image.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link href="/">Create Tier List Now →</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
