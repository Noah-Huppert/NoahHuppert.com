Sequel.migration do
  up do
    create_table :posts do
      primary_key :id              , :null => false
      foreign_key :user_id , :users, :null => false
      String      :category,         :null => false
      String      :title   ,         :null => false
      String      :content ,         :null => false, :text => true
    end
  end

  down do
    drop_table :posts
  end
end
