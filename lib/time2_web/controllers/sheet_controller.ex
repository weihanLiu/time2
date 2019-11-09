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

  def create(conn, %{"sheet" => %{"date"=> date}}) do
    IO.inspect conn
    user = conn.assigns[:current_user]
    if user.manager_id do

      {:ok, sheet} = Sheets.create_sheet(%{worker_id: user.id, date: date})
        # tasks |> Enum.each(fn t -> case Integer.parse(t["hours"]) do
        #   {i,_} ->
        #     note = t["note"]
        #     jId = Time2.Jobs.get_id_by_code(t["job_code"])
        #     Time2.Tasks.create_task (%{hours: i, note: note, job_id: jId, sheet_id: sheet.id})
        #   :error ->
        #     nil
        #   end
        # end)
        sheet = Sheets.get_sheet(sheet.id)
        IO.inspect sheet
      conn
          |> put_status(:created)
          |> put_resp_header("location", Routes.sheet_path(conn, :show, sheet))
          |> render("show.json", sheet: sheet)
    else
      resp = %{errors: ["Not a worker!"]}
      conn
          |> put_resp_header("content-type", "application/json; charset=UTF-8")
          |> send_resp(:not_acceptable, Jason.encode!(resp))
    end
  end


  def approve(conn, %{"id" => id}) do
    sheet = Sheets.get_sheet(id)
    with {:ok, %Sheet{} = sheet} <- Sheets.update_sheet(sheet, %{approved: true}) do
      render(conn, "show.json", sheet: sheet)
    end

  end

  def show(conn, %{"id" => id}) do
    sheet = Sheets.get_sheet(id)
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
