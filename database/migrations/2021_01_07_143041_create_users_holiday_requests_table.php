<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersHolidayRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_holiday_request', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained();
            $table->foreignId('holiday_request_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_holiday_request', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['holiday_request_id']);
        });
        Schema::dropIfExists('user_holiday_request');
    }
}
