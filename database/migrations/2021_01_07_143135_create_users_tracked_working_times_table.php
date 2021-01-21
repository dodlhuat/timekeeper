<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTrackedWorkingTimesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_tracked_working_times', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained();
            $table->foreignId('tracked_working_time_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users_tracked_working_times', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['tracked_working_time_id']);
        });
        Schema::dropIfExists('users_tracked_working_times');
    }
}
