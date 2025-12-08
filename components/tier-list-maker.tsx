"use client";

import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import html2canvas from "html2canvas";
import { BookOpen, Download, ExternalLink, Trash2, Upload } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useRef, useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import type { LanguageType } from "@/lib/translations";

interface ImageItem {
  id: string;
  src: string;
}

interface TierRow {
  tier: string;
  label: string;
  color: string;
  items: ImageItem[];
}

function DraggableImage({
  item,
  sourceTier,
  onRemove,
}: {
  item: ImageItem;
  sourceTier: string | null;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.id,
      data: { item, sourceTier },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="group relative h-20 w-20 cursor-move overflow-hidden rounded-md border-2 border-border transition-transform hover:scale-105 hover:border-primary"
    >
      <img
        src={item.src || "/placeholder.svg"}
        alt="Tier item"
        className="h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute right-0 top-0 bg-destructive p-1 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
      >
        <Trash2 className="h-3 w-3" />
      </button>
    </div>
  );
}

function DroppableArea({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`${className} ${isOver ? "ring-2 ring-primary ring-offset-2" : ""}`}
    >
      {children}
    </div>
  );
}

const tierColorMap: Record<string, string> = {
  S: "#ef4444",
  A: "#f97316",
  B: "#eab308",
  C: "#84cc16",
  D: "#3b82f6",
};

interface TierListMakerProps {
  dictionary: {
    title: string;
    description: string;
    addImages: string;
    export: string;
    clearAll: string;
    unassignedTitle: string;
    unassignedPlaceholder: string;
    tierLabels: Record<string, string>;
    blog: string;
  };
  locale: LanguageType;
}

const TierListMaker = ({ dictionary, locale }: TierListMakerProps) => {
  const [unassignedImages, setUnassignedImages] = useState<ImageItem[]>([]);
  const [tiers, setTiers] = useState<TierRow[]>([
    {
      tier: "S",
      label: dictionary.tierLabels.S,
      color: "bg-red-500",
      items: [],
    },
    {
      tier: "A",
      label: dictionary.tierLabels.A,
      color: "bg-orange-500",
      items: [],
    },
    {
      tier: "B",
      label: dictionary.tierLabels.B,
      color: "bg-yellow-500",
      items: [],
    },
    {
      tier: "C",
      label: dictionary.tierLabels.C,
      color: "bg-lime-500",
      items: [],
    },
    {
      tier: "D",
      label: dictionary.tierLabels.D,
      color: "bg-blue-500",
      items: [],
    },
  ]);
  const [activeItem, setActiveItem] = useState<{
    item: ImageItem;
    sourceTier: string | null;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tierListRef = useRef<HTMLDivElement>(null);

  // Generate correct path for current locale
  const getLocalizedPath = (path: string) => {
    return locale === "en" ? path : `/${locale}${path}`;
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: ImageItem[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newImages.push({
          id: `${Date.now()}-${Math.random()}`,
          src: event.target?.result as string,
        });
        if (newImages.length === files.length) {
          setUnassignedImages((prev) => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const data = active.data.current as {
      item: ImageItem;
      sourceTier: string | null;
    };
    setActiveItem(data);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;

    if (!over || !activeItem) {
      setActiveItem(null);
      return;
    }

    const { item, sourceTier } = activeItem;
    const targetId = over.id as string;

    if (sourceTier === null) {
      setUnassignedImages((prev) => prev.filter((img) => img.id !== item.id));
    } else {
      setTiers((prev) =>
        prev.map((tier) =>
          tier.tier === sourceTier
            ? { ...tier, items: tier.items.filter((img) => img.id !== item.id) }
            : tier,
        ),
      );
    }

    if (targetId === "unassigned") {
      setUnassignedImages((prev) => [...prev, item]);
    } else {
      setTiers((prev) =>
        prev.map((tier) =>
          tier.tier === targetId
            ? { ...tier, items: [...tier.items, item] }
            : tier,
        ),
      );
    }

    setActiveItem(null);
  };

  const handleExport = async () => {
    if (!tierListRef.current) return;

    const clone = tierListRef.current.cloneNode(true) as HTMLElement;
    clone.style.cssText = `
      background-color: #1a1a1a;
      border: 1px solid #404040;
      border-radius: 0.5rem;
      overflow: hidden;
    `;

    const tierRows = clone.querySelectorAll<HTMLElement>(".tier-row");
    tierRows.forEach((row, index) => {
      const tierKey = tiers[index]?.tier;
      row.style.cssText = `
        display: flex;
        border-bottom: 1px solid #404040;
      `;

      const label = row.querySelector<HTMLElement>(".tier-label");
      if (label && tierKey) {
        label.style.cssText = `
          width: 5rem;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.875rem;
          font-weight: 700;
          color: #ffffff;
          background-color: ${tierColorMap[tierKey]};
        `;
      }

      const content = row.querySelector<HTMLElement>(".tier-content");
      if (content) {
        content.style.cssText = `
          flex: 1;
          min-height: 100px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
          background-color: rgba(64, 64, 64, 0.3);
          padding: 0.75rem;
        `;
      }
    });

    const deleteButtons = clone.querySelectorAll<HTMLElement>("button");
    deleteButtons.forEach((btn) => {
      btn.style.display = "none";
    });

    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    document.body.appendChild(clone);

    try {
      const canvas = await html2canvas(clone, {
        backgroundColor: "#1a1a1a",
        scale: 2,
      });

      const link = document.createElement("a");
      link.download = "tier-list.png";
      link.href = canvas.toDataURL();
      link.click();
    } finally {
      document.body.removeChild(clone);
    }
  };

  const handleClear = () => {
    setUnassignedImages([]);
    setTiers((prev) => prev.map((tier) => ({ ...tier, items: [] })));
  };

  const removeImage = (imageId: string, tierName: string | null) => {
    if (tierName === null) {
      setUnassignedImages((prev) => prev.filter((img) => img.id !== imageId));
    } else {
      setTiers((prev) =>
        prev.map((tier) =>
          tier.tier === tierName
            ? { ...tier, items: tier.items.filter((img) => img.id !== imageId) }
            : tier,
        ),
      );
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center justify-between gap-2">
            <Link href="/posts" scroll={false}>
              <Button variant="ghost" size="sm" className="gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">{dictionary.blog}</span>
              </Button>
            </Link>
            <div className="flex gap-2">
              <ThemeToggle />
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </div>

          <div className="mb-8 text-center">
            <h1 className="mb-2 text-balance text-4xl font-bold tracking-tight">
              {dictionary.title}
            </h1>
            <p className="text-muted-foreground">{dictionary.description}</p>
          </div>

          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              {dictionary.addImages}
            </Button>
            <Button
              onClick={handleExport}
              variant="secondary"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              {dictionary.export}
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="gap-2 bg-transparent"
            >
              <Trash2 className="h-4 w-4" />
              {dictionary.clearAll}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <div
            ref={tierListRef}
            className="mb-8 overflow-hidden rounded-lg border border-border bg-card"
          >
            {tiers.map((tier) => (
              <div
                key={tier.tier}
                className="tier-row flex border-b border-border last:border-b-0"
              >
                <div
                  className={`tier-label flex w-20 flex-shrink-0 items-center justify-center text-3xl font-bold text-white ${tier.color}`}
                >
                  {tier.label}
                </div>
                <DroppableArea
                  id={tier.tier}
                  className="tier-content flex min-h-[100px] flex-1 flex-wrap items-center gap-2 bg-muted/30 p-3"
                >
                  {tier.items.map((item) => (
                    <DraggableImage
                      key={item.id}
                      item={item}
                      sourceTier={tier.tier}
                      onRemove={() => removeImage(item.id, tier.tier)}
                    />
                  ))}
                </DroppableArea>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h2 className="mb-4 text-lg font-semibold">
              {dictionary.unassignedTitle} ({unassignedImages.length})
            </h2>
            <DroppableArea
              id="unassigned"
              className="flex min-h-[120px] flex-wrap gap-3 rounded-md bg-muted/30 p-4"
            >
              {unassignedImages.length === 0 ? (
                <div className="flex w-full items-center justify-center text-muted-foreground">
                  {dictionary.unassignedPlaceholder}
                </div>
              ) : (
                unassignedImages.map((item) => (
                  <DraggableImage
                    key={item.id}
                    item={item}
                    sourceTier={null}
                    onRemove={() => removeImage(item.id, null)}
                  />
                ))
              )}
            </DroppableArea>
          </div>
        </div>

        <footer className="mt-16 border-t border-border py-8 text-center text-sm text-muted-foreground">
          <div className="mx-auto max-w-4xl space-y-4">
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://github.com/SymphonyIceAttack/tier-list-maker-two"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                GitHub
              </Link>
              <Link
                href={getLocalizedPath("/about")}
                className="hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href={getLocalizedPath("/contact")}
                className="hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <Link
                href={getLocalizedPath("/faq")}
                className="hover:text-primary transition-colors"
              >
                FAQ
              </Link>
              <Link
                href={getLocalizedPath("/privacy")}
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href={getLocalizedPath("/terms")}
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
            <p>© 2025 Tier List Maker. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <DragOverlay>
        {activeItem ? (
          <div className="h-20 w-20 cursor-move overflow-hidden rounded-md border-2 border-primary opacity-80">
            <img
              src={activeItem.item.src || "/placeholder.svg"}
              alt="Dragging item"
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export { TierListMaker };
export default TierListMaker;
