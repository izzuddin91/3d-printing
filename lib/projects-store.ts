import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import type { Project } from "@/lib/types";

export async function getRecentProjects(limitCount: number = 6): Promise<Project[]> {
  try {
    const projectsQuery = query(
      collection(firestore, "projects"),
      orderBy("date_created", "desc"),
      limit(limitCount)
    );

    const snapshot = await getDocs(projectsQuery);
    const projects: Project[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      projects.push({
        id: doc.id,
        image_url: data.image_url || "",
        title: data.title || "",
        description: data.description || "",
        date_created: data.date_created?.toDate?.() || new Date(),
      });
    });

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}
