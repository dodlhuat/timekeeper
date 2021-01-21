<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersUserRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_user_role', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained();
            $table->foreignId('user_role_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_user_role', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['user_role_id']);
        });
        Schema::dropIfExists('user_user_role');
    }
}
