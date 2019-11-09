defmodule Time2.Sheets.Sheet do
  use Ecto.Schema
  import Ecto.Changeset

  schema "sheets" do
    field :approved, :boolean, default: false
    field :date, :date

    belongs_to :worker, Time2.Users.User
    has_many :tasks, Time2.Tasks.Task

    timestamps()
  end

  @doc false
  def changeset(sheet, attrs) do
    sheet
    |> cast(attrs, [:approved, :date, :worker_id])
    |> validate_required([:approved, :date, :worker_id])
  end
end
