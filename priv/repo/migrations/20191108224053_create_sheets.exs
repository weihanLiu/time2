defmodule Time2.Repo.Migrations.CreateSheets do
  use Ecto.Migration

  def change do
    create table(:sheets) do
      add :approved, :boolean, default: false, null: false
      add :date, :date
      add :worker_id, references(:users), null: false

      timestamps()
    end

    create index(:sheets, [:worker_id])


  end
end
