import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MysqlComponent } from './mysql/mysql.component';
import { PostgresqlComponent } from './postgresql/postgresql.component';
import { MongodbComponent } from './mongodb/mongodb.component';
import { MariadbComponent } from './mariadb/mariadb.component';
import { CassandraComponent } from './cassandra/cassandra.component';
import { ReadwriteService } from './mysql/readwrite.service';
import { ElasticsearchComponent } from './elasticsearch/elasticsearch.component';
import { RedisComponent } from './redis/redis.component';
import { SqliteComponent } from './sqlite/sqlite.component';
import { FirebaseComponent } from './firebase/firebase.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    MysqlComponent,
    PostgresqlComponent,
    MongodbComponent,
    MariadbComponent,
    CassandraComponent,
    ElasticsearchComponent,
    RedisComponent,
    SqliteComponent,
    FirebaseComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
