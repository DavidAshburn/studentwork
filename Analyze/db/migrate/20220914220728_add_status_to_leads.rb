class AddStatusToLeads < ActiveRecord::Migration[7.0]
  def change
    add_column :leads, :status, :string
  end
end
