<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrackedBreaksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tracked_breaks', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('tracked_working_time_id')->constrained();
            $table->dateTime('start');
            $table->dateTime('end')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tracked_breaks', function (Blueprint $table) {
            $table->dropForeign(['tracked_working_time_id']);
        });
        Schema::dropIfExists('tracked_breaks');
    }
}
