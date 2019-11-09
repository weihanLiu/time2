defmodule Time2.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :hours, :integer
    field :note, :string

    belongs_to :sheet, Time2.Sheets.Sheet
    belongs_to :job, Time2.Jobs.Job

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:note, :hours, :sheet_id, :job_id])
    |> validate_required([:note, :hours, :sheet_id, :job_id])
  end
end
