# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Time2.Repo.insert!(%Time2.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.


alias Time2.Repo
alias Time2.Users.User
alias Time2.Jobs.Job

pass = Argon2.hash_pwd_salt("password12345678")
Repo.insert!(%User{name: "manager1", email: "man1@example.com", password_hash: pass})
Repo.insert!(%User{name: "manager2", email: "man2@example.com", password_hash: pass})

Repo.insert!(%User{name: "worker1", email: "wor1@example.com", password_hash: pass, manager_id: 1})
Repo.insert!(%User{name: "worker2", email: "wor2@example.com", password_hash: pass, manager_id: 1})
Repo.insert!(%User{name: "worker3", email: "wor3@example.com", password_hash: pass, manager_id: 2})

Repo.insert!(%Job{budget: 2, job_code: "VAOR-01", description: "job1 Des", name: "job1"})
Repo.insert!(%Job{budget: 10, job_code: "VAOR-02", description: "job2 Des", name: "job2"})
