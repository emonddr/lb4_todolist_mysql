import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

/*
 Configuring datasource for loopback mysql connector: https://strongloop.com/strongblog/getting-started-with-the-mysql-connector-for-loopback/
https://github.com/strongloop/loopback-connector-mysql
 */
const config = {
  name: 'db',
  connector: 'mysql',
  url: '',
  host: '127.0.0.1',
  port: 3306,
  user: 'some_user',
  password: 'some_password',
  database: 'some_database',
  createDatabase: true,
};

// the 'createDatabase' setting is only available for mysql connector, I believe.
// otherwise, you must create the database first, before running 'npm run migrate'

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
