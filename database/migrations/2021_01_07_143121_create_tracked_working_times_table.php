<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrackedWorkingTimesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tracked_working_times', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('user_id')->constrained();
            $table->dateTime('start');
            $table->dateTime('end')->nullable();
            $table->foreignId('type_id')->constrained('work_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tracked_working_times', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['type_id']);
        });
        Schema::dropIfExists('tracked_working_times');
    }
}
