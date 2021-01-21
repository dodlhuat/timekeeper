<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersWorkingTimesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_working_times', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained();
            $table->foreignId('working_time_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users_working_times', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['working_time_id']);
        });
        Schema::dropIfExists('users_working_times');
    }
}
