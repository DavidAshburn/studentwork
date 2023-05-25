class CreatePlugboards < ActiveRecord::Migration[7.0]
  def change
    create_table :plugboards do |t|
      t.string :label
      t.string :group

      t.timestamps
    end
  end
end
