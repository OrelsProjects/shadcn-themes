import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const trendingThemes = [
  { name: "Neon Nights", downloads: 1234, category: "Dark" },
  { name: "Corporate Blue", downloads: 987, category: "Corporate" },
  { name: "Minimalist White", downloads: 876, category: "Minimalist" },
  { name: "Forest Green", downloads: 765, category: "Nature" },
];

export function TrendingThemes() {
  return (
    <section className="mb-12">
      <h3 className="text-2xl font-bold mb-4">Trending Themes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingThemes.map(theme => (
          <Card key={theme.name}>
            <CardHeader>
              <CardTitle className="text-lg">{theme.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                {theme.category}
              </p>
              <p className="text-sm font-semibold">
                {theme.downloads} downloads
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
