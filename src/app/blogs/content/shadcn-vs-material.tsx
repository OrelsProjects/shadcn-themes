import { Metadata } from "next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Shadcn UI vs Material UI: A Comprehensive Comparison | Shadcn Blog",
  description:
    "Explore the key differences between Shadcn UI and Material UI (MUI) to determine which library best suits your project needs.",
};

export default function ShadcnVsMUIComparison() {
  const comparisonData = [
    {
      feature: "Flexibility",
      shadcn: true,
      mui: false,
      shadcnDesc: "Highly customizable",
      muiDesc: "Limited to Material Design",
    },
    {
      feature: "Performance",
      shadcn: true,
      mui: false,
      shadcnDesc: "Lightweight, modular",
      muiDesc: "Larger bundle size",
    },
    {
      feature: "Theming Options",
      shadcn: true,
      mui: false,
      shadcnDesc: "Full control",
      muiDesc: "Restricted customization",
    },
    {
      feature: "Ease of Use",
      shadcn: false,
      mui: true,
      shadcnDesc: "Steeper learning curve",
      muiDesc: "Easier for beginners",
    },
    {
      feature: "Documentation",
      shadcn: false,
      mui: true,
      shadcnDesc: "Growing resources",
      muiDesc: "Extensive resources",
    },
    {
      feature: "Community Support",
      shadcn: false,
      mui: true,
      shadcnDesc: "Smaller, newer community",
      muiDesc: "Large, established community",
    },
    {
      feature: "Design Philosophy",
      shadcn: true,
      mui: false,
      shadcnDesc: "Minimalist, modern",
      muiDesc: "Strict adherence to Material Design",
    },
    {
      feature: "Developer Control",
      shadcn: true,
      mui: false,
      shadcnDesc: "Full access to code",
      muiDesc: "Limited modifications",
    },
  ];

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        Shadcn UI vs Material UI: Choosing the Right UI Library for Your Project
      </h1>

      <p className="lead">
        When it comes to building modern web applications, choosing the right UI
        library can significantly impact your development process and the final
        product. In this article, we'll compare two popular options: Shadcn UI
        and Material UI (MUI), highlighting their strengths and differences to
        help you make an informed decision for your next project.
      </p>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">
          Feature Comparison
        </h2>
        <div className="rounded-xl border bg-card shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[250px] py-6 text-lg font-semibold">
                  Feature
                </TableHead>
                <TableHead className="py-6 text-lg font-semibold">
                  <div className="flex items-center space-x-2">
                    <span className="text-primary">Shadcn UI</span>
                  </div>
                </TableHead>
                <TableHead className="py-6 text-lg font-semibold">
                  <div className="flex items-center space-x-2">
                    <span className="text-primary">Material UI</span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((row, index) => (
                <TableRow
                  key={row.feature}
                  className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}
                >
                  <TableCell className="font-medium text-base py-6">
                    {row.feature}
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`rounded-full p-1 ${row.shadcn ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}
                      >
                        {row.shadcn ? (
                          <CheckIcon className="h-5 w-5" />
                        ) : (
                          <XIcon className="h-5 w-5" />
                        )}
                      </div>
                      <span className="text-sm leading-tight">
                        {row.shadcnDesc}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`rounded-full p-1 ${row.mui ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}
                      >
                        {row.mui ? (
                          <CheckIcon className="h-5 w-5" />
                        ) : (
                          <XIcon className="h-5 w-5" />
                        )}
                      </div>
                      <span className="text-sm leading-tight">
                        {row.muiDesc}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="my-12">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Key Differences Explained
        </h2>
        <div className="grid gap-6 mt-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Shadcn UI Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Shadcn UI excels in flexibility, performance, and developer
                control, making it ideal for projects where customization and
                modern design are priorities. Its key advantages include:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Highly customizable components</li>
                <li>Lightweight and modular architecture</li>
                <li>Full control over theming and styling</li>
                <li>Direct access to component code for modifications</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Material UI (MUI) Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Material UI is a better choice for those seeking a pre-built
                design system aligned with Google's Material Design standards.
                Its strengths include:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Easier learning curve for beginners</li>
                <li>Extensive documentation and resources</li>
                <li>Large, established community for support</li>
                <li>Consistent implementation of Material Design principles</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="my-12">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Choosing the Right Library for Your Project
        </h2>
        <p>
          When deciding between Shadcn UI and Material UI, consider the
          following factors:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>
            <strong>Project Requirements:</strong> If you need a highly
            customizable UI that doesn't conform to a specific design system,
            Shadcn UI might be the better choice. For projects that benefit from
            a well-established design system, Material UI could be more
            suitable.
          </li>
          <li>
            <strong>Development Team Experience:</strong> Teams familiar with
            Material Design might find MUI easier to work with initially.
            However, developers who prefer more control and are comfortable with
            modern web technologies might appreciate Shadcn UI's approach.
          </li>
          <li>
            <strong>Performance Considerations:</strong> If minimizing bundle
            size and optimizing performance are top priorities, Shadcn UI's
            lightweight nature gives it an edge.
          </li>
          <li>
            <strong>Long-term Maintainability:</strong> Consider how each
            library aligns with your project's long-term goals. Shadcn UI's
            modular approach might offer more flexibility for future changes,
            while MUI's established ecosystem could provide more stability.
          </li>
        </ul>
      </section>

      <section className="my-12">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Conclusion
        </h2>
        <p>
          Both Shadcn UI and Material UI have their strengths and are suitable
          for different project needs. Shadcn UI offers greater flexibility and
          control, making it an excellent choice for custom designs and
          performance-critical applications. Material UI, with its extensive
          documentation and adherence to Material Design, is ideal for projects
          that prioritize rapid development and consistency with Google's design
          language.
        </p>
        <p>
          Ultimately, the choice between Shadcn UI and Material UI depends on
          your project's specific requirements, your team's expertise, and your
          long-term development goals. By carefully considering these factors,
          you can select the UI library that best aligns with your project's
          needs and sets you up for success.
        </p>
      </section>
    </article>
  );
}
