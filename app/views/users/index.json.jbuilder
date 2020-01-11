json.array! @users do |user|
  json.name user.username
  json.id user.id
end