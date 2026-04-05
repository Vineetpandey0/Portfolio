import styles from "./portfolio.module.css";
import Image from "next/image";
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

  return (
    <div className={styles.container}>
      <header className={`${styles.header} animate-fade-in`}>
        <div className={styles.logo} style={{ fontFamily: "var(--font-outfit)" }}>
          VP.
        </div>
        <nav className={styles.nav}>
          <a href="#about" className={styles.navLink}>About</a>
          <a href="#projects" className={styles.navLink}>Projects</a>
          <a href="https://github.com/vineetpandey0" target="_blank" rel="noopener noreferrer" className={styles.navLink}>GitHub</a>
        </nav>
      </header>

      <main>
        <section id="about" className={styles.hero}>
          <div className={`${styles.profileImageContainer} animate-fade-in delay-100`}>
             <div className={styles.profileImagePlaceholder}>
               Image Upload Later
             </div>
          </div>
          <h1 className={`${styles.heroTitle} animate-fade-in delay-200`} style={{ fontFamily: "var(--font-outfit)" }}>
            Hi, I'm Vineet Pandey
          </h1>
          <p className={`${styles.heroSubtitle} animate-fade-in delay-300`}>
            I am a developer who loves building unique, responsive, and beautiful web applications. 
            Currently showcasing my open-source projects.
          </p>
          <a href="#projects" className={`${styles.ctaButton} animate-fade-in delay-300`}>
            View My Work
          </a>
        </section>

        <section id="projects" className={styles.section}>
          <h2 className={styles.sectionTitle} style={{ fontFamily: "var(--font-outfit)" }}>
            Selected Projects
          </h2>
          
          <div className={styles.grid}>
            {repos.map((repo, index) => (
              <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                key={repo.id} 
                className={`${styles.card} animate-fade-in`}
                style={{ animationDelay: `${200 + index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle} style={{ fontFamily: "var(--font-outfit)" }}>{repo.name}</h3>
                  <svg 
                    className={styles.githubIcon}
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
                <p className={styles.cardDescription}>{repo.description}</p>
                <div className={styles.cardFooter}>
                  {repo.language && (
                    <span className={styles.languageBadge}>
                      <span className={styles.languageDot}></span>
                      {repo.language}
                    </span>
                  )}
                  <span>View Project ↗</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Vineet Pandey. All rights reserved.</p>
      </footer>
    </div>
  );
}