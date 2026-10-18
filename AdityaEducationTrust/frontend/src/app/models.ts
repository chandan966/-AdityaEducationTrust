export interface College { id: number; slug: string; name: string; category: string; shortDescription: string; description: string; image: string; courses: Course[]; facilities: string[]; departments: string[]; }
export interface Course { name: string; level: string; duration: string; eligibility: string; description: string; }
export interface Notice { id: number; title: string; category: string; summary: string; publishedAt: string; attachmentUrl?: string | null; }
export interface EventItem { id: number; title: string; category: string; description: string; eventDate: string; imageUrl?: string | null; }
export interface Enquiry { name: string; phone: string; email: string; collegeSlug: string; course: string; qualification: string; academicYear: string; message: string; }
