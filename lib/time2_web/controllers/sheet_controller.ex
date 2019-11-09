defmodule Time2Web.SheetController do
  use Time2Web, :controller

  alias Time2.Sheets
  alias Time2.Sheets.Sheet

  action_fallback Time2Web.FallbackController
  plug Time2Web.Plugs.RequireAuth when action in [:index, :create, :show, :approve]

  def index(conn, _params) do
    sheets = Sheets.list_sheets()
    render(conn, "index.json", sheets: sheets)
  end

  def create(conn, %{"sheet" => sheet_params}) do
    with {:ok, %Sheet{} = sheet} <- Sheets.create_sheet(sheet_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.sheet_path(conn, :show, sheet))
      |> render("show.json", sheet: sheet)
    end
  end

  def show(conn, %{"id" => id}) do
    sheet = Sheets.get_sheet!(id)
    render(conn, "show.json", sheet: sheet)
  end

  def update(conn, %{"id" => id, "sheet" => sheet_params}) do
    sheet = Sheets.get_sheet!(id)

    with {:ok, %Sheet{} = sheet} <- Sheets.update_sheet(sheet, sheet_params) do
      render(conn, "show.json", sheet: sheet)
    end
  end

  def delete(conn, %{"id" => id}) do
    sheet = Sheets.get_sheet!(id)

    with {:ok, %Sheet{}} <- Sheets.delete_sheet(sheet) do
      send_resp(conn, :no_content, "")
    end
  end

  def approve(conn, %{"id" => id}) do
    user = conn.assigns[:current_user]
    if !user.manager_id do
      sheet = Sheets.get_sheet!(id)
      with {:ok, %Sheet{} = sheet} <- Sheets.update_sheet(sheet, %{approve: true}) do
          render(conn, "show.json", sheet: sheet)
      end
    end
  end
end
