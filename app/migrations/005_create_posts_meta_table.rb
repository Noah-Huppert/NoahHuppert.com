Sequel.migration do
  up do
    create_table :posts_meta do
      primary_key :id
      foreign_key :post_id, :posts, :null => false
      String      :type   ,         :null => false
      String      :data   ,         :null => false
    end
  end

  down do
    drop_table :posts_meta
  end
end
