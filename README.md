# Investor form

## Running app in terminal 

    docker-compose up

On mac OS:

    open http://localhost:3000

On other systems open http://localhost:3000 in your browser

## Tests

To run test run

    docker-compose run frontend npm test

## File uploads

File uploads are landing into `backend/uploads`


## Troubleshooting

### Port taken

Sometimes you already have something running on ports that are used by this app, so make sure those ports are free to use:

- 3000 (frontend)
- 3001 (backend)
- 35432 (postgres)
