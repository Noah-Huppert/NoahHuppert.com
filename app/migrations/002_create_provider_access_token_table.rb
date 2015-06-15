Sequel.migration do
  up do
    create_table :provider_access_tokens do
      foreign_key :user_id      , :users, :null => false
      String      :provider     ,         :null => false
      String      :access_token ,         :null => false
      String      :refresh_token,         :null => false
      DateTime    :expires_on   ,         :null => false
    end
  end

  down do
    drop_table :provider_access_tokens
  end
end
