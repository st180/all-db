import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MysqlComponent } from './mysql/mysql.component';
import { PostgresqlComponent } from './postgresql/postgresql.component';
import { MongodbComponent } from './mongodb/mongodb.component';
import { MariadbComponent } from './mariadb/mariadb.component';
import { CassandraComponent } from './cassandra/cassandra.component';
import { ElasticsearchComponent } from './elasticsearch/elasticsearch.component';
import { RedisComponent } from './redis/redis.component';
import { SqliteComponent } from './sqlite/sqlite.component';
import { FirebaseComponent } from './firebase/firebase.component';

const routes: Routes = [

  { path: '',   redirectTo: 'mysql', pathMatch: 'full' },
  { path: 'mysql', component: MysqlComponent },
  { path: 'postgresql', component: PostgresqlComponent },
  { path: 'mongodb', component: MongodbComponent },
  { path: 'mariadb', component: MariadbComponent },
  { path: 'cassandra', component: CassandraComponent },
  { path: 'elasticsearch', component: ElasticsearchComponent },
  { path: 'redis', component: RedisComponent },
  { path: 'sqlite', component: SqliteComponent },
  { path: 'firebase', component: FirebaseComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
