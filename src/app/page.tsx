import Link from "next/link";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  fork: boolean;
  topics: string[];
}

async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch("https://api.github.com/users/vineetpandey0/repos?sort=updated", {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) throw new Error("Failed to fetch repos");
    const repos: Repo[] = await res.json();
    
    // Filter out forks and repos without descriptions or specific ones
    return repos.filter(
      (repo) => !repo.fork && repo.description && repo.name !== "Vineetpandey0"
    );
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const repos = await getRepos();

  const email = "vineetpandey0090@gmail.com";
  const linkedin = "https://www.linkedin.com/in/vineetpandey24";
  
  // Array of technology slugs for individual icons
  const techStack = [
    "tailwind", "html", "css", "react", "nextjs", "typescript", "javascript",
    "nodejs", "python", "mongodb", "git", "github", "zustand", "express", "c", "cpp"
  ];

  const expoIcon = "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/expo.png";

  const activeProjects = ["adstudio", "readyui", "context-sync"];

  return (
    <div className="max-w-[1200px] mx-auto px-8">
      <header className="py-8 flex justify-between items-center animate-fade-in">
        <div 
          className="text-2xl font-extrabold tracking-tighter bg-gradient-to-r from-text-primary to-accent bg-clip-text text-transparent" 
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          VP.
        </div>
        <nav className="flex items-center gap-8">
          <a href="#about" className="font-medium text-text-secondary hover:text-text-primary relative group nav-underline transition-colors">About</a>
          <a href="#projects" className="font-medium text-text-secondary hover:text-text-primary relative group nav-underline transition-colors">Projects</a>
          <a href={`mailto:${email}`} className="font-medium text-text-secondary hover:text-text-primary relative group nav-underline transition-colors">Contact</a>
          <a
            id="download-resume-btn"
            href="/Resume.pdf"
            download="Vineet_Pandey_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-sm border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-200 hover:-translate-y-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>
        </nav>
      </header>

      <main>
        <section id="about" className="pt-14 flex flex-col items-center text-center">
          <h1 
            className="text-7xl font-extrabold tracking-tight mb-4 leading-[1.1] opacity-0 animate-fade-in delay-200" 
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Hi, I'm Vineet Pandey
          </h1>
          <p className="text-xl text-text-secondary max-w-[600px] mb-10 opacity-0 animate-fade-in delay-300">
            I am a Full stack developer who loves building scalable, responsive, and beautiful web applications.
            Currently showcasing my open-source projects and professional skill set. 
          </p>
          <div className="flex gap-4 opacity-0 animate-fade-in delay-300">
            <a 
              href="#projects" 
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-text-primary text-bg font-semibold rounded-full transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              View My Work
            </a>
            <a 
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-surface text-text-primary border border-border font-semibold rounded-full transition-all hover:-translate-y-0.5"
            >
              Contact Me
            </a>
          </div>
        </section>

        {/* Tech Marquee Section - Re-structured for better motion */}
        <section className="py-12 overflow-hidden marquee-mask opacity-0 animate-fade-in delay-300">
          <div className="flex w-max animate-marquee">
            <div className="flex gap-12 items-center shrink-0 px-6">
              {techStack.map((tech) => (
                <img key={`${tech}-1`} src={`https://skillicons.dev/icons?i=${tech}`} alt={tech} className="h-12 md:h-16 w-auto" />
              ))}
              <img src={expoIcon} alt="Expo" className="h-12 md:h-16 w-auto object-contain" />
            </div>
            <div className="flex gap-12 items-center shrink-0 px-6">
              {techStack.map((tech) => (
                <img key={`${tech}-2`} src={`https://skillicons.dev/icons?i=${tech}`} alt={tech} className="h-12 md:h-16 w-auto" />
              ))}
              <img src={expoIcon} alt="Expo" className="h-12 md:h-16 w-auto object-contain" />
            </div>
          </div>
        </section>

        <section id="projects" className="py-20">
          <div className="flex items-center justify-between mb-12">
            <h2 
              className="text-4xl font-bold relative inline-block after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-12 after:h-1 after:bg-accent after:rounded-sm animate-fade-in" 
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Selected Projects
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo, index) => {
              // Exact name match or contains logic
              const isActive = activeProjects.some(p => repo.name.toLowerCase().includes(p.toLowerCase()));
              
              return (
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  key={repo.id} 
                  className="glass rounded-3xl p-8 flex flex-col h-full group transition-all hover:-translate-y-1 hover:scale-[1.01] hover:shadow-lg hover:border-accent-hover opacity-0 animate-fade-in"
                  style={{ animationDelay: `${200 + index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl font-bold text-text-primary group-hover:text-accent transition-colors" style={{ fontFamily: "var(--font-outfit)" }}>
                        {repo.name}
                      </h3>
                      {isActive && (
                        <div className="flex items-center gap-2">
                           <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                           <span className="text-[10px] font-bold uppercase tracking-wider text-green-500/80">Active</span>
                        </div>
                      )}
                    </div>
                    <svg 
                      className="text-text-secondary transition-colors group-hover:text-accent"
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </div>
                  <p className="text-text-secondary mb-6 flex-grow text-[0.95rem] leading-relaxed">
                    {repo.description}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-border mt-auto">
                    {repo.language && (
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-badge-bg text-badge-text rounded-full text-xs font-semibold">
                        <span className="w-2 h-2 rounded-full bg-accent"></span>
                        {repo.language}
                      </span>
                    )}
                    <span className="text-sm font-medium transition-colors group-hover:text-accent">View Project ↗</span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        <section id="contact" className="py-24 text-center">
          <div className="glass max-w-2xl mx-auto rounded-3xl p-12">
            <h2 
              className="text-4xl font-bold mb-6" 
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Let's Build Something Great
            </h2>
            <p className="text-text-secondary mb-10 text-lg">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="flex flex-col items-center gap-4">
              <a href={`mailto:${email}`} className="text-2xl font-bold text-accent hover:underline decoration-wavy underline-offset-8 transition-all">
                {email}
              </a>
              <div className="flex gap-6 mt-4">
                 <a href="https://github.com/vineetpandey0" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary font-medium transition-colors">GitHub</a>
                 <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary font-medium transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-16 pb-8 border-t border-border mt-16 text-center text-text-secondary">
        <p>© {new Date().getFullYear()} Vineet Pandey. Built with Next.js & Tailwind CSS v4.</p>
        <p className="mt-2 text-sm">Reach out at <a href={`mailto:${email}`} className="text-accent hover:underline font-medium">{email}</a></p>
      </footer>
    </div>
  );
}