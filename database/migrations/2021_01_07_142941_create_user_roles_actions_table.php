<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserRolesActionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_role_action', function (Blueprint $table) {
            $table->foreignId('user_role_id')->constrained();
            $table->foreignId('action_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_role_action', function (Blueprint $table) {
            $table->dropForeign(['user_role_id']);
            $table->dropForeign(['action_id']);
        });
        Schema::dropIfExists('user_role_action');
    }
}
