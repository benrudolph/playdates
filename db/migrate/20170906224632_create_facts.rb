class CreateFacts < ActiveRecord::Migration[5.1]
  def change
    create_table :facts do |t|
      t.string :name
      t.string :icon
      t.belongs_to :user

      t.timestamps
    end
  end
end
