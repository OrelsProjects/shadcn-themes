export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
  }
  
  export const blogPosts: BlogPost[] = [
    {
      slug: "what-is-the-shadcn-way",
      title: "What Is the Shadcn Way?",
      date: "2023-07-15",
      excerpt: "Discover the elegance of minimal design with a powerful accent.",
      content: `
        In the world of modern web design, the pursuit of simplicity and elegance often leads to better usability and aesthetics. The Shadcn Way has become a notable design approach that reflects this philosophy.
  
        So, what exactly is the Shadcn Way?
  
        In short:
  
        The Shadcn Way is about using a single primary color while keeping the rest of the design minimal, with subtle shades of gray or white.
  
        This approach ensures that your primary color stands out—it becomes the focal point of your design while everything else recedes into the background.
  
        Breaking Down the Shadcn Way
  
        The concept is simple yet powerful:
  
        Primary Color Pops: The entire theme revolves around one standout color. Whether it's blue, green, or even a bold red, this color grabs attention and guides users through key actions, buttons, or highlights.
  
        Dimmed Secondary Palette:
  
        For Dark Mode, the background and supporting colors stay within black-to-gray shades.
  
        For Light Mode, the palette shifts to white-to-gray shades.
  
        These dimmed tones ensure that the primary color pops without competition, creating a clean and focused look.
  
        Minimalism: By limiting the color palette, the design feels modern, uncluttered, and easy on the eyes.
  
        Why the Shadcn Way Works
  
        1. Focus and Clarity
  
        By reducing distractions and noise, users know exactly where to look. Buttons, calls to action, and links naturally stand out because the primary color becomes the star of the show.
  
        2. Modern Aesthetic
  
        Minimal color palettes feel timeless. The mix of soft grays and a single vibrant hue creates a refined, polished design—something that feels intentionally crafted.
  
        3. Easy to Implement
  
        Unlike overly colorful themes, the Shadcn Way simplifies design choices. You only need to focus on selecting the right primary color, and everything else is neutral.
  
        4. Works for Any Brand
  
        Whether your brand is bold, professional, or playful, this approach adapts. All you have to do is pick the primary color that reflects your identity.
  
        Converting Colorful Themes to Shadcn
  
        If you're starting with a colorful theme and converting it to follow the Shadcn Way, the result is a modern, clean design. Here's how it works:
  
        Strip Down the Secondary Colors: Replace vibrant secondary tones with shades of gray (or white, depending on the mode).
  
        Highlight the Primary: Ensure the primary color stands out against the muted background.
  
        Refine: Check that no other colors are competing for attention.
  
        The result? A sleek, minimalistic design that lets your primary color shine while maintaining clarity and focus.
  
        Real-World Examples
  
        Buttons and CTAs: The primary color draws attention to interactive elements.
  
        Headings or Highlights: Use the primary color sparingly for important text.
  
        Charts and Visuals: Neutral grays paired with subtle accents make charts easy to digest.
  
        Final Thoughts
  
        The Shadcn Way is more than just a design philosophy—it's a solution to the clutter of modern web design. By embracing minimalism and leveraging a single standout color, you create a user experience that feels both modern and functional.
  
        Whether you're building a SaaS product, landing page, or dashboard, the Shadcn Way ensures your design is sleek, focused, and easy to implement.
  
        Pick your primary color. Let it shine. Keep the rest minimal.
  
        That's the Shadcn Way.
      `
    },
    // Add more blog posts here
  ];
  
  export async function getAllBlogPosts(): Promise<BlogPost[]> {
    // In a real application, you might fetch this data from an API or database
    return blogPosts;
  }
  
  export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    // In a real application, you might fetch this data from an API or database
    return blogPosts.find(post => post.slug === slug);
  }
  
  