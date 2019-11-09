defmodule Time2.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :name, :string


    belongs_to :manager, Time2.Users.User
    has_many :workers, Time2.Users.User, foreign_key: :manager_id



    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :name, :manager])
    |> validate_required([:email, :name, :manager])
  end
end
