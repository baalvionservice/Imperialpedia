"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  Quote,
  Image as ImageIcon,
  Link as LinkIcon,
  Plus,
  Trash2,
  Save,
  Eye,
} from "lucide-react";
import {
  Term,
  TermsBodyBlock,
  accordionType,
  TextSegment,
} from "@/lib/data/terms";
import { NewsCategory } from "@/lib/data.news";
import { RichTextEditor } from "./rich-text-editor";
import BodyBlock from "../ui/body-block";

const NEWS_CATEGORIES: NewsCategory[] = [
  "Markets",
  "Economy",
  "Stocks",
  "Crypto",
  "PersonalFinance",
  "RealEstate",
  "ETFs",
  "Editorial",
  "Guides",
  "Bonds",
];

interface TermFormData {
  slugTitle: string;
  slug: string;
  title: string;
  author: string;
  category: NewsCategory | "";
  description: string;
  imageUrl: string;
  content: TermsBodyBlock[];
}

export default function TiptapEditor() {
  const [formData, setFormData] = useState<TermFormData>({
    slug: "",
    slugTitle: "",
    title: "",
    author: "",
    category: "",
    description: "",
    imageUrl: "",
    content: [],
  });

  const [isPreview, setIsPreview] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline hover:text-blue-800",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
    ],
    content: "",
    immediatelyRender: false,
  });

  const handleInputChange = (field: keyof TermFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Auto-generate slug from title
    if (field === "slugTitle" && value) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const addContentBlock = (type: TermsBodyBlock["type"]) => {
    const newBlock: TermsBodyBlock = (() => {
      switch (type) {
        case "paragraph":
          return {
            type: "paragraph",
            content: [{ type: "text", content: "" }],
          };
        case "heading":
          return { type: "heading", text: "", id: `heading-${Date.now()}` };
        case "subheading":
          return { type: "subheading", text: "" };
        case "quote":
          return { type: "quote", text: "", attribution: "" };
        case "callout":
          return { type: "callout", content: [{ type: "text", content: "" }] };
        case "list":
          return { type: "list", items: [""] };
        case "image":
          return { type: "image", url: "", caption: "" };
        case "accordion":
          return { type: "accordion", title: "", content: [] };
        case "expandable":
          return {
            type: "expandable",
            content: [{ type: "text", content: "" }],
          };
        default:
          return {
            type: "paragraph",
            content: [{ type: "text", content: "" }],
          };
      }
    })();

    setFormData((prev) => ({
      ...prev,
      content: [...prev.content, newBlock],
    }));
  };

  const updateContentBlock = (index: number, updatedBlock: TermsBodyBlock) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content.map((block, i) =>
        i === index ? updatedBlock : block
      ),
    }));
  };

  const removeContentBlock = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    if (!formData.title || !formData.category || !formData.description) {
      alert("Please fill in all required fields");

      return;
    }

    const termData: Term = {
      slug: formData.slug,
      slugTitle: formData.slugTitle,
      title: formData.title,
      author: formData.author || "Anonymous",
      category: formData.category as NewsCategory,
      description: formData.description,
      imageUrl: formData.imageUrl || "",
      content: formData.content,
    };

    console.log("Saving term:", termData);
    // Here you would typically send to your API
    alert("Term saved successfully!");
  };

  if (!editor) return null;

  return (
    <div className="flex-1 mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create New Term</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            {isPreview ? "Edit" : "Preview"}
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Term
          </Button>
        </div>
      </div>

      {!isPreview ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Fields */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Term Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter term title"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Slug Title *</Label>
                  <Input
                    id="slugTitle"
                    value={formData.slugTitle}
                    onChange={(e) => handleInputChange("slugTitle", e.target.value)}
                    placeholder="Enter term for slugTitle"
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    disabled
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    placeholder="auto-generated-slug"
                  />
                </div>

                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) =>
                      handleInputChange("author", e.target.value)
                    }
                    placeholder="Author name"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {NEWS_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      handleInputChange("imageUrl", e.target.value)
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Brief description of the term"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Editor */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Content Blocks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addContentBlock("paragraph")}
                  >
                    Paragraph
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addContentBlock("heading")}
                  >
                    Heading
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addContentBlock("quote")}
                  >
                    Quote
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addContentBlock("callout")}
                  >
                    Callout
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addContentBlock("list")}
                  >
                    List
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addContentBlock("image")}
                  >
                    Image
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addContentBlock("accordion")}
                  >
                    Accordion
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addContentBlock("expandable")}
                  >
                    Expandable
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Content Blocks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.content.map((block, index) => (
                  <ContentBlockEditor
                    key={index}
                    block={block}
                    index={index}
                    onUpdate={updateContentBlock}
                    onRemove={removeContentBlock}
                  />
                ))}

                {formData.content.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No content blocks yet. Add some using the buttons on the
                    left.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <TermPreview term={formData as Term} />
      )}
    </div>
  );
}

// Content Block Editor Component
interface ContentBlockEditorProps {
  block: TermsBodyBlock;
  index: number;
  onUpdate: (index: number, block: TermsBodyBlock) => void;
  onRemove: (index: number) => void;
}

function ContentBlockEditor({
  block,
  index,
  onUpdate,
  onRemove,
}: ContentBlockEditorProps) {
  const updateBlock = (updatedBlock: TermsBodyBlock) => {
    onUpdate(index, updatedBlock);
  };

  return (
    <Card className="relative">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{block.type}</Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(index)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {block.type === "paragraph" && (
          <RichTextEditor
            content={block.content}
            onChange={(content) =>
              updateBlock({
                type: "paragraph",
                content: content,
                id: block.id,
              })
            }
            placeholder="Enter paragraph content with inline links"
            rows={3}
          />
        )}

        {block.type === "heading" && (
          <div className="space-y-2">
            <Input
              value={block.text}
              onChange={(e) =>
                updateBlock({
                  type: "heading",
                  text: e.target.value,
                  id: block.id,
                })
              }
              placeholder="Heading text"
            />
            <Input
              value={block.id}
              onChange={(e) =>
                updateBlock({
                  type: "heading",
                  text: block.text,
                  id: e.target.value,
                })
              }
              placeholder="Heading ID (for anchors)"
            />
          </div>
        )}

        {block.type === "subheading" && (
          <Input
            value={block.text}
            onChange={(e) =>
              updateBlock({
                type: "subheading",
                text: e.target.value,
              })
            }
            placeholder="Subheading text"
          />
        )}

        {block.type === "quote" && (
          <div className="space-y-2">
            <Textarea
              value={block.text}
              onChange={(e) =>
                updateBlock({
                  type: "quote",
                  text: e.target.value,
                  attribution: block.attribution,
                  id: block.id,
                })
              }
              placeholder="Quote text"
              rows={2}
            />
            <Input
              value={block.attribution || ""}
              onChange={(e) =>
                updateBlock({
                  type: "quote",
                  text: block.text,
                  attribution: e.target.value,
                  id: block.id,
                })
              }
              placeholder="Attribution (optional)"
            />
          </div>
        )}

        {block.type === "callout" && (
          <RichTextEditor
            content={block.content}
            onChange={(content) =>
              updateBlock({
                type: "callout",
                content: content,
                id: block.id,
              })
            }
            placeholder="Enter callout content with inline links"
            rows={2}
          />
        )}

        {block.type === "list" && (
          <div className="space-y-2">
            {block.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => {
                    const newItems = [...block.items];
                    newItems[itemIndex] = e.target.value;
                    updateBlock({
                      type: "list",
                      items: newItems,
                      id: block.id,
                    });
                  }}
                  placeholder={`List item ${itemIndex + 1}`}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newItems = block.items.filter(
                      (_, i) => i !== itemIndex
                    );
                    updateBlock({
                      type: "list",
                      items: newItems,
                      id: block.id,
                    });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                updateBlock({
                  type: "list",
                  items: [...block.items, ""],
                  id: block.id,
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        )}

        {block.type === "image" && (
          <div className="space-y-2">
            <Input
              value={block.url}
              onChange={(e) =>
                updateBlock({
                  type: "image",
                  url: e.target.value,
                  caption: block.caption,
                  id: block.id,
                })
              }
              placeholder="Image URL"
            />
            <Input
              value={block.caption || ""}
              onChange={(e) =>
                updateBlock({
                  type: "image",
                  url: block.url,
                  caption: e.target.value,
                  id: block.id,
                })
              }
              placeholder="Image caption (optional)"
            />
          </div>
        )}

        {block.type === "accordion" && (
          <div className="space-y-4">
            <Input
              value={block.title}
              onChange={(e) =>
                updateBlock({
                  type: "accordion",
                  title: e.target.value,
                  content: block.content,
                  id: block.id,
                })
              }
              placeholder="Accordion title"
            />

            <div className="space-y-3">
              <Label className="text-sm font-medium">Questions & Answers</Label>
              {block.content.map((item, itemIndex) => (
                <Card key={itemIndex} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-muted-foreground">
                        Question {itemIndex + 1}
                      </Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newContent = block.content.filter(
                            (_, i) => i !== itemIndex
                          );
                          updateBlock({
                            type: "accordion",
                            title: block.title,
                            content: newContent,
                            id: block.id,
                          });
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    <Input
                      value={item.question}
                      onChange={(e) => {
                        const newContent = [...block.content];
                        newContent[itemIndex] = {
                          ...item,
                          question: e.target.value,
                        };
                        updateBlock({
                          type: "accordion",
                          title: block.title,
                          content: newContent,
                          id: block.id,
                        });
                      }}
                      placeholder="Enter question"
                    />

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Answers
                      </Label>
                      {item.answer.map((answer, answerIndex) => (
                        <div key={answerIndex} className="flex gap-2">
                          <Input
                            value={answer.text}
                            onChange={(e) => {
                              const newContent = [...block.content];
                              const newAnswers = [...item.answer];
                              newAnswers[answerIndex] = {
                                ...answer,
                                text: e.target.value,
                              };
                              newContent[itemIndex] = {
                                ...item,
                                answer: newAnswers,
                              };
                              updateBlock({
                                type: "accordion",
                                title: block.title,
                                content: newContent,
                                id: block.id,
                              });
                            }}
                            placeholder="Answer text"
                          />
                          <Input
                            value={answer.link}
                            onChange={(e) => {
                              const newContent = [...block.content];
                              const newAnswers = [...item.answer];
                              newAnswers[answerIndex] = {
                                ...answer,
                                link: e.target.value,
                              };
                              newContent[itemIndex] = {
                                ...item,
                                answer: newAnswers,
                              };
                              updateBlock({
                                type: "accordion",
                                title: block.title,
                                content: newContent,
                                id: block.id,
                              });
                            }}
                            placeholder="Link URL"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newContent = [...block.content];
                              const newAnswers = item.answer.filter(
                                (_, i) => i !== answerIndex
                              );
                              newContent[itemIndex] = {
                                ...item,
                                answer: newAnswers,
                              };
                              updateBlock({
                                type: "accordion",
                                title: block.title,
                                content: newContent,
                                id: block.id,
                              });
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newContent = [...block.content];
                          const newAnswers = [
                            ...item.answer,
                            { text: "", link: "" },
                          ];
                          newContent[itemIndex] = {
                            ...item,
                            answer: newAnswers,
                          };
                          updateBlock({
                            type: "accordion",
                            title: block.title,
                            content: newContent,
                            id: block.id,
                          });
                        }}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Answer
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newContent = [
                    ...block.content,
                    { question: "", answer: [{ text: "", link: "" }] },
                  ];
                  updateBlock({
                    type: "accordion",
                    title: block.title,
                    content: newContent,
                    id: block.id,
                  });
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>
          </div>
        )}

        {block.type === "expandable" && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Expandable Content</Label>
            <RichTextEditor
              content={block.content}
              onChange={(content) =>
                updateBlock({
                  type: "expandable",
                  content: content,
                  id: block.id,
                })
              }
              placeholder="Enter expandable content with inline links"
              rows={4}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Helper function to render TextSegment arrays with inline links
function renderTextSegments(segments: TextSegment[]) {
  return segments.map((segment, index) => {
    if (segment.type === "text") {
      return <span key={index}>{segment.content}</span>;
    }
    if (segment.type === "link") {
      return (
        <a
          key={index}
          href={segment.href}
          className="text-blue-600 underline hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          {segment.content}
        </a>
      );
    }
    if (segment.type === "list") {
      return (
        <span key={index}>
          {segment.content.map((item, i) => (
            <span key={i}>
              {item.type === "text" ? (
                item.content
              ) : (
                <a
                  href={item.href}
                  className="text-blue-600 underline hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.content}
                </a>
              )}
            </span>
          ))}
        </span>
      );
    }
    return null;
  });
}

// Term Preview Component
function TermPreview({ term }: { term: Term }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent className="prose max-w-none">
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold">{term.title}</h1>
            <p className="text-muted-foreground">By {term.author}</p>
            <Badge>{term.category}</Badge>
          </div>

          <div className="prose-none">
            {term.content.map((block, i) => (
              <BodyBlock key={i} block={block} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
