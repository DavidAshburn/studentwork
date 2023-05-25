class CreatePlugroutes < ActiveRecord::Migration[7.0]
  def change
    create_table :plugroutes do |t|
      t.string :label

      t.timestamps
    end
  end
end
