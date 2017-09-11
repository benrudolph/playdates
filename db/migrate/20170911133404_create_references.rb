class CreateReferences < ActiveRecord::Migration[5.1]
  def change
    create_table :references do |t|
      t.belongs_to :user
      t.text :body
      t.string :author

      t.timestamps
    end
  end
end
