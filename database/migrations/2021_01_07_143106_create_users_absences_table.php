<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersAbsencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_absences', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained();
            $table->foreignId('absence_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_absence', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['absence_id']);
        });
        Schema::dropIfExists('user_absence');
    }
}
