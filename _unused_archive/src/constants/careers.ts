export interface JobOpening {
  id: string;
  title: string;
  location: string;
  experience: string;
  type: string;
  description: string;
  applyUrl: string;
}

export const jobOpenings: JobOpening[] = [
  {
    id: "junior-software-engineer",
    title: "Junior Software Engineer",
    location: "Surat, Gujarat (On-site)",
    experience: "0–2 years",
    type: "Full-time",
    description:
      "HM Coding is a growing software development company building real-world systems such as dashboards, SaaS platforms, and performance-critical applications. As a Junior Software Engineer, you will work on live production projects under senior guidance, focusing on clean code, fundamentals, and practical problem-solving. This role is ideal for candidates who want hands-on experience and a clear growth path into a mid-level engineering role.",
    applyUrl: "https://in.indeed.com/viewjob?jk=463317e64bf8fd0d",
  },
  {
    id: "iot-engineer",
    title: "IoT Engineer",
    location: "Surat, Gujarat (On-site)",
    experience: "1–3 years",
    type: "Full-time",
    description:
      "We are looking for an IoT Engineer to work on real-time industrial systems integrated with physical machines. You will interface with sensors, controllers, and embedded devices to capture and transmit low-latency data for live dashboards and monitoring systems. This role involves close interaction with hardware and backend teams to ensure reliable, performance-focused communication.",
    applyUrl: "https://in.indeed.com/viewjob?jk=2e6e4ddffe225652",
  },
  {
    id: "software-engineer",
    title: "Software Engineer",
    location: "Surat, Gujarat (On-site)",
    experience: "2–4 years",
    type: "Full-time",
    description:
      "HM Coding is seeking a Software Engineer to build and maintain high-performance, production-grade software systems. You will work across frontend and backend layers, improve system performance, and collaborate with engineers working on real-time and industrial-integrated applications. This role is suited for engineers who enjoy ownership, clean architecture, and solving real-world problems.",
    applyUrl: "https://in.indeed.com/viewjob?jk=73d947a5cc31f2e8",
  },
];
