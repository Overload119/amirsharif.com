---
layout: single
title: Concurrent Ruby and Database Pools
published: true
tags: dev
---

I kept getting this error message:

```
(ActiveRecord::ConnectionTimeoutError): could not obtain a connection from the pool within 5.000 seconds (waited 5.001 seconds); all pooled connections were in use
```

Here's a helpful resource on how [Connection Pools](https://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/ConnectionPool.html) operate.

In my case it was caused by this line, which I was running inside of a Sidekiq job.

```rb
Concurrent::Promise.execute do
  # Do something with the database
end
```

By wrapping it with `ActiveRecord::Base.connection_pool.with_connection` the issue went away.

Here were some commands I discovered during debugging that helped reproduce the bug locally.

```rb
# Check open connections.
ActiveRecord::Base.connection_pool.stat
ActiveRecord::Base.clear_active_connections!
ActiveRecord::Base.connection_pool.instance_eval { @connections }.length

# Invoke a sleep in MySQL.
ActiveRecord::Base.connection.execute("SELECT SLEEP(1);")

# Testing whether or not connections are being returned to the pool.
5.times do 
  Concurrent::Promise.execute do
    ActiveRecord::Base.connection_pool.with_connection do
      Company.first
      ActiveRecord::Base.connection.execute("SELECT SLEEP(1);")
    end
  end
end
```