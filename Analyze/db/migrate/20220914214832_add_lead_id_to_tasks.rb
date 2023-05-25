class AddLeadIdToTasks < ActiveRecord::Migration[7.0]
  def change
    add_column :tasks, :lead_id, :integer
    add_index :tasks, :lead_id
    add_column :tasks, :user_id, :integer
    add_index :tasks, :user_id
  end
end
