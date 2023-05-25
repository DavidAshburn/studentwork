class CreateRooms < ActiveRecord::Migration[7.0]
  def change
    create_table :rooms do |t|
      t.string :label
      t.string :suite
      t.string :shape

      t.timestamps
    end
  end
end
