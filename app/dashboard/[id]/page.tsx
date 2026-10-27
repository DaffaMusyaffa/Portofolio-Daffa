import ProjectForm from '@/components/ProjectForm';

export default function EditProjectPage({ params }: { params: { id: string } }) {
  return <ProjectForm id={params.id} />;
}
