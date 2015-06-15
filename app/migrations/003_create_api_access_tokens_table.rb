Sequel.migration do
  up do
    create_table :api_access_tokens do
      foreign_key :user_id     , :users, :null => false
      String      :access_token,         :null => false
      DateTime    :expires_on  ,         :null => false
    end
  end

  down do
    drop_table :api_access_tokens
  end
end
