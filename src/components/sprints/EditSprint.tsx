type SprintProps = {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  sprintId: string;
  onSprintEdit: () => void;
};

export function EditSprint({
  id,
  name,
  description,
  sprintId,
  onSprintEdit,
}: SprintProps) {
  return <div>Edit Sprint Component</div>;
}
