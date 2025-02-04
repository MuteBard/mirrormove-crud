const ENV = process.env;

exports.APP = {
    host: ENV['HOST'],
    port: Number(ENV['PORT'])
}
exports.JWT = {
    secret: ENV["JWT_SECRET"]
}
exports.MYSQL = {
    connectionString: ENV["DB_CONNECTION"]
}